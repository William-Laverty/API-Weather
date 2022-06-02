const app = Vue.createApp({
    components: {
        'imports': Vue.defineAsyncComponent( () => loadModule('../templates/imports.vue', options) ),
        'hero-cover': Vue.defineAsyncComponent( () => loadModule('../templates/heroCover.vue', options) ),
        'api': Vue.defineAsyncComponent( () => loadModule('../templates/api.vue', options) ),
    },

    data: function() {
        return {
            homePageResources: {
                title: "Welcome to Weather 2.0",
            },

            apiPageResources: {
                title: "Weather 2.0",
            },
        }
    },
})

async function fetchURL(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}