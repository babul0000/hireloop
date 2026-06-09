import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    'seeker_pro': 'price_1TgEElAlomi13zcXMGwN1JCj',
    'seeker_premium': 'price_1TgRjaAlomi13zcXlKLXtacC',
    'recruiter_enterprise': 'price_1TgRkKAlomi13zcXMsBcYgb6',
    'recruiter_growth': 'price_1TgRkqAlomi13zcXQWUhfoEU'
}