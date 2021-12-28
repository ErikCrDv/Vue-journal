<template>
<div class="entry-title d-flex justify-content-between p-2">
    <div>
        <span class="text-success fs-3 fw-bold">24</span>
        <span class="mx-1 fs-3">Dic</span>
        <span class="mx-2 fs-4 fw-light">2021</span>
    </div>
    <div>
        <button class="btn btn-danger mx-2">
            Borrar
            <i class="fa fa-trash-alt"></i>
        </button>
        <button class="btn btn-primary">
            Subir Foto
            <i class="fa fa-upload"></i>
        </button>
    </div>
</div>

<hr>

<div class="d-flex flex-column px-3 h-75">
    <textarea
        placeholder="Que sucedio hoy?"></textarea>
</div>

<Fab icon="fa-save"/>

<img 
    src="https://steemitimages.com/DQmfCvDD2pQbqLDAKXDnr6Rknbf1VBjLb5F7vBwC6MR51so/Romantic%20Sceneries%20Wallpapers%2003.jpg" 
    alt="entry-picture"
    class="img-thumbnail">
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
    components: {
        Fab: defineAsyncComponent( () => import('../components/Fab.vue') )
    }
}
</script>

<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus { 
        outline: none;
    }
}

img {
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>