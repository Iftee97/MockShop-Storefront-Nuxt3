<template>
  <main>
    <h1 class="text-3xl text-gray-700 text-center font-bold mb-8">
      MockShop Storefront Nuxt3
    </h1>
    <div>
      <ul class="my-6 grid grid-cols-4 gap-4 list-none">
        <li v-for="(collection, index) in collections" :key="index">
          <NuxtLink :to="`/collections/${collection.node.handle}`" class="inline-block">
            <NuxtImg 
              :src="collection.node.image.src" 
              :alt="`${collection.node.title} image`"
              class="w-full h-full object-cover mb-2"
            />
            <p class="text-lg font-medium mb-3">
              {{ collection.node.title }}
            </p>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { 
  getFakeStoreProducts, 
  getFakeStoreCategories, 
  getFakeStoreUsers,
  getCollections
} from '@/shopify/queries'

const fetchedThings = ref({}) // purely for testing reasons

const { data: collections } = await useAsyncData('collections', () => getCollections())
const { data: products } = await useAsyncData('products', () => getFakeStoreProducts()) // purely for testing reasons
const { data: categories } = await useAsyncData('categories', () => getFakeStoreCategories()) // purely for testing reasons
const { data: users } = await useAsyncData('users', () => getFakeStoreUsers()) // purely for testing reasons

fetchedThings.value = {
  collections: collections.value,
  products: products.value,
  categories: categories.value,
  users: users.value
}
console.log('fetchedThings', fetchedThings.value)
</script>
