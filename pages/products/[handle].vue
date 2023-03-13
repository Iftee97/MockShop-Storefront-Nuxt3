<template>
  <div>
    <h1>
      Product handle: {{ route.params.handle }}
    </h1>
    {{ product }}
  </div>
</template>

<script setup>
import { getProductByHandle } from '@/shopify/queries'
const route = useRoute()

useHead({
  title: `${route.params.handle} | MockShop Storefront`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Product Page'
    }
  ]
})

const { data: product } = await useAsyncData('product', () => getProductByHandle(route.params.handle))
</script>
