import { createRouter, createWebHistory } from "vue-router";

//GENERAL COMPONENTS
import SuccessPage from "@/generalComponents/AlertMessage/SuccessMessage.vue";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ()=> import("@/views/Commerce/Home/View/HomeView.vue"),
  }, 
  {
    path: "/onboarding",
    name: "OnboardingMainView",
    component: () => import("@/views/Onboarding/OnboardingHome/View/OnboardingMainView.vue"),
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import("@/views/Commerce/CartPage/View/CartPageView.vue"),
  },
  {
    path: "/success",
    name: "successPage",
    component: SuccessPage,
    props: route => ({
      isSuccess: route.query.success === 'true',
      message: route.query.message || 'Error desconocido',
    }),
  },
  {
    path: "/home",
    name: "HomeView",
    component: ()=> import("@/views/Commerce/Home/View/HomeView.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Commerce/Login/View/LoginView.vue"),
  },
  {
    path: "/productUpdate/:productId",
    name: "ProductUpdate",
    component: () =>
      import("@/views/Commerce/ProductUpdate/View/ProductUpdateView.vue"),
    props: (route) => ({ productId: route.params.productId }),
  },
  {
    path: "/productList",
    name: "ProductListView",
    component: () => import("@/views/Commerce/ProductList/Views/ProductListView.vue"),
  },
  {
    path: "/status",
    name: "Status",
    component: () => import("@/generalComponents/AlertMessage/SuccessMessage.vue"),
  },
  {
    path: "/:category",
    name: "CategoryProducts",
    component: () => import("@/views/Commerce/ProductList/Views/ProductListView.vue"),
    props: true,
  },
  {
    path: "/:category/:subcategory",
    name: "SubcategoryProducts",
    component: () => import("@/views/Commerce/ProductList/Views/ProductListView.vue"),
    props: true,
  },
  {
    path: '/productDetailPage/:id', 
    name: 'ProductDetailPageView', 
    component: () => import("@/views/Commerce/ComponentsCommerce/ProductDetailPage/ProductDetailPageView.vue"),
    props: true, 
  },
  {
    path: "/admin-panel", 
    name: "AdminPanel", 
    component: () => import("@/views/Commerce/AdminPanel/Views/PanelAdminView.vue"),
    props: true, 
  },
  {
    path: "/about-us",
    name: "AboutUs",
    component: () => import("@/views/Commerce/About/AboutUs.vue"),
  },
  {
    path: "/payment",
    name: "Payment",
    component: () => import("@/views/Commerce/Payment/Views/PaymentLayout.vue"),
  },
  {
    path: "/vender", 
    name: "VenderProductos",
    component: () => import("@/views/Commerce/Vender/View/AddProductView.vue"),
  },
  {
    path:"/my-account",
    name: "MyAccountView",
    component: () => import("@/views/Commerce/MyAccount/MyAccountView.vue"),
  },
  {
    path: "/my-account-form",
    name: "MyAccountForm",
    component: () => import("@/views/Commerce/MyAccount/Components/MyAccountForm.vue"),
  },
  {
    path: "/my-purchases",
    name: "MyPurchases",
    component: () => import("@/views/Commerce/MyAccount/Components/MyPurchases.vue"),
  },
  {
    path:"/users",
    name: "Users",
    component: () => import("@/views/Commerce/Users/View/UsersView.vue"),
  },
  {
    path:"/support",
    name: "Support",
    component: () => import("@/views/Commerce/Support/View/SupportView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return { top: 0 }
  }
});

export default router; 