<template>
  <div>
    <!-- {{ route }} -->
    <!-- {{ collection }} -->
    <h1 class="text-3xl text-center text-gray-700 font-bold mb-8">
      {{ collection.title }}
    </h1>
    <div class="grid grid-cols-3 gap-4 items-center">
      <div 
        v-for="(product, index) in collection.products.edges" 
        :key="product.id || index" 
        class="border border-gray-100 p-2 rounded-md"
      >
        <NuxtLink :to="`/products/${product.node.handle}`" class="inline-block">
          <NuxtImg 
            :src="product.node.featuredImage.url" 
            :alt="`${product.node.title} image`"
            class="w-full h-full object-cover mb-2"
          />
          <p class="text-lg text-center font-medium mb-3">
            {{ product.node.title }}
          </p>
        </NuxtLink>
      </div>
    </div>
    <NuxtLink to="/" class="flex items-center justify-center">
      <button class="py-2 px-3 bg-gray-200 hover:bg-gray-100 rounded-md">
        <span class="flex items-center gap-1">
          <ChevronRight class="w-4 h-4" />
          <span class="text-light text-base">
            Go Home
          </span>
        </span>
      </button>
    </NuxtLink>
  </div>
</template>

<script setup>
import { getCollectionByHandle } from '@/shopify/queries'
const route = useRoute()

useHead({
  title: `${route.params.handle} | MockShop Storefront`,
  meta: [
    {
      hid: 'description',
      name: 'description',
      content: 'Collection Page'
    }
  ]
})

const { data: collection } = await useAsyncData('collection', () => getCollectionByHandle(route.params.handle))
</script>
