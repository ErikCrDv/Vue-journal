<template>

  <div class="entry-container mb-3 pointer p-2"
       @click="$router.push({name: 'entry', params: {id: 10}})">

      <div class="entry-title d-flex">
          <span class="text-success fs-5 fw-bold">24</span>
          <span class="mx-1 fs-5">Dic</span>
          <span class="mx2 fw-light">2021</span>
      </div>

      <div class="entry-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt laborum numquam, sunt nam quidem et. Esse dolore ducimus provident quaerat, soluta magni est incidunt odit quae veritatis fugit corporis aliquid?
      </div>

  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container {
  border-bottom: 1px solid #2c3e50;
  transition: 0.2s all aese-in;

  &:hover {
    background-color: lighten($color: grey, $amount: 45);
    transition: 0.2s all aese-in;
  }

  .entry-description {
    font-size: 18px;
  }
}
</style>