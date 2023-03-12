<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-700 mb-8">
      Products
    </h1>
    {{ products }}
  </div>
</template>

<script setup>
import { getProducts } from '@/shopify/queries'

useHead({
  title: 'Products | MockShop Storefront',
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Products Page'
    }
  ]
})

const { data: products } = await useAsyncData('products', () => getProducts())
</script>
