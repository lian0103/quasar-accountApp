<script setup>
const title = "PageTitle";
</script>

<template>
  <div class="infoBox mx-auto flex justify-center text-white h-screen">
    <div class="bg-dark w-full px-4 py-6">
      <div class="row text-2xl">
        <div class="col-12 col-md-8 mx-auto">
          <div
            class="relative border-8 rounded shadow-2xl font-mono text-7xl md:text-9xl grid grid-cols-2 gap-x-px"
          >
            <!-- left side -->
            <div class="relative bg-black p-8">
              <!-- background grid of black squares -->
              <div class="absolute inset-0 grid grid-rows-2">
                <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                <div class="bg-gradient-to-br from-gray-700 to-black"></div>
              </div>

              <!-- time numbers -->
              <span class="relative left-2 md:left-4">01</span>
              <span class="absolute right-2 bottom-2 text-xl font-Noto"
                >月</span
              >

              <!-- line across the middle -->
              <div class="absolute inset-0 flex items-center">
                <div class="h-1 w-full bg-gray-800"></div>
              </div>
            </div>

            <!-- right side -->
            <div class="relative bg-black p-8">
              <!-- background grid of black squares -->
              <div class="absolute inset-0 grid grid-rows-2">
                <div class="bg-gradient-to-br from-gray-800 to-black"></div>
                <div class="bg-gradient-to-br from-gray-700 to-black"></div>
              </div>

              <span class="relative left-4">25</span>
              <span class="absolute right-2 bottom-2 text-xl font-Noto"
                >日</span
              >

              <!-- line across the middle -->
              <div class="absolute inset-0 flex items-center">
                <div class="h-1 w-full bg-gray-800"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="h-px w-full md:w-3/4 mx-auto border-2 mt-6 md:mt-12"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infoBox {
  max-width: 768px;
}
</style>
