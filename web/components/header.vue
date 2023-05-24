<template>
    <nav>
        <ul>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

            <li class="tittle"><h1>Vue 3 To-Do App</h1></li>
            <li>
               <h4> <nuxt-link to="/">Index Page</nuxt-link></h4>
            </li>
            <li>
               <h4> <nuxt-link to="/completed">Completed</nuxt-link></h4>
            </li>
            <li>
                <h4> <nuxt-link to="/deleted">Deleted</nuxt-link></h4>
            </li>
        </ul>
    </nav>
</template>

<script>
export default {
    components: true
}

</script>

<style scoped>

nav {
    background-color: #f2f2f2;
    padding: 20px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 14px;
    line-height: 1.42857143;
    color: #333;

}

nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

}

.tittle {
    padding-right: 1100px;
}
nav ul li {
    display: inline-block;

}

nav ul li a {
    display: block;
    padding: 10px 20px;
    text-decoration: none;
    color: #333;
}

nav ul li a:hover {
    background-color: #ddd;
}
</style>