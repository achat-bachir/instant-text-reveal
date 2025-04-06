
import { serve } from 'https://deno.land/std@0.190.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.21.0';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Gérer les requêtes CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Récupérer l'utilisateur à partir de l'en-tête d'autorisation
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data } = await supabaseClient.auth.getUser(token);
    const user = data.user;
    
    if (!user?.id) {
      throw new Error('Utilisateur non authentifié');
    }

    // Récupérer le profil utilisateur avec l'ID client Stripe
    const { data: profile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('stripe_customer_id, plan')
      .eq('id', user.id)
      .single();

    if (profileError || !profile) {
      throw new Error('Profil utilisateur non trouvé');
    }

    // Si l'utilisateur a déjà le plan premium dans la base de données
    if (profile.plan === 'premium') {
      return new Response(
        JSON.stringify({ subscribed: true }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Si l'utilisateur n'a pas d'ID client Stripe, il n'a pas d'abonnement
    if (!profile.stripe_customer_id) {
      return new Response(
        JSON.stringify({ subscribed: false }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        }
      );
    }

    // Initialiser Stripe
    const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
      apiVersion: '2023-10-16',
    });

    // Vérifier s'il existe un abonnement actif
    const subscriptions = await stripe.subscriptions.list({
      customer: profile.stripe_customer_id,
      status: 'active',
      limit: 1,
    });

    const hasActiveSubscription = subscriptions.data.length > 0;
    
    if (hasActiveSubscription) {
      // Toujours mettre à jour le plan de l'utilisateur si une souscription active est détectée
      // Cela corrige le problème où le plan n'était pas mis à jour
      await supabaseClient
        .from('profiles')
        .update({ plan: 'premium' })
        .eq('id', user.id);
    }

    return new Response(
      JSON.stringify({ subscribed: hasActiveSubscription }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message, subscribed: false }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  }
});
