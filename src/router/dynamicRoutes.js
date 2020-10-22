import allRoutes from "./allRoutes"
import Home from "../pages/Home";
const dynamicRoutes =[
    {
        path: "/",
        component: Home,
        children:[
            ...allRoutes
        ]
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        //   import(/* webpackChunkName: "about" */ "../pages/Home")
        // children:[
        //   {
        //      path: 'student', 
        //     component: ()=>import(/* webpackChunkName:"student" */ "../pages/Home/student")
          
        //   }
        // ]
      },
      {
        path: '*',
        component: () => import(/*webpackChunkName:'page404' */'../pages/Page404')
    }

]
export default dynamicRoutes