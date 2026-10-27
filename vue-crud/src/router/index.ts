import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import AppLayout from '../components/AppLayout.vue';
import Login from '../pages/Login.vue';
import Register from '../pages/Register.vue';
import MemberList from '../pages/MemberList.vue';
import MemberForm from '../pages/MemberForm.vue';
import MembershipYearList from '../pages/MembershipYearList.vue';
import MembershipYearForm from '../pages/MembershipYearForm.vue';
import BranchList from '../pages/BranchList.vue';
import BranchForm from '../pages/BranchForm.vue';
import MembershipFeeList from '../pages/MembershipFeeList.vue';
import MembershipFeeForm from '../pages/MembershipFeeForm.vue';
import TerritoryLevelList from '../pages/TerritoryLevelList.vue';
import TerritoryLevelForm from '../pages/TerritoryLevelForm.vue';
import RoleList from '../pages/RoleList.vue';
import RoleForm from '../pages/RoleForm.vue';
import MembershipPaymentList from '../pages/MembershipPaymentList.vue';
import MembershipPaymentForm from '../pages/MembershipPaymentForm.vue';

const routes: RouteRecordRaw[] = [
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  {
    path: '/',
    component: AppLayout,
    children: [
      { path: '', redirect: '/member' },
      { path: '/member', component: MemberList },
      { path: '/member/new', component: MemberForm },
      { path: '/member/:id/edit', component: MemberForm },
      { path: '/membership-year', component: MembershipYearList },
      { path: '/membership-year/new', component: MembershipYearForm },
      { path: '/membership-year/:id/edit', component: MembershipYearForm },
      { path: '/branch', component: BranchList },
      { path: '/branch/new', component: BranchForm },
      { path: '/branch/:id/edit', component: BranchForm },
      { path: '/membership-fee', component: MembershipFeeList },
      { path: '/membership-fee/new', component: MembershipFeeForm },
      { path: '/membership-fee/:id/edit', component: MembershipFeeForm },
      { path: '/territory-level', component: TerritoryLevelList },
      { path: '/territory-level/new', component: TerritoryLevelForm },
      { path: '/territory-level/:id/edit', component: TerritoryLevelForm },
      { path: '/role', component: RoleList },
      { path: '/role/new', component: RoleForm },
      { path: '/role/:id/edit', component: RoleForm },
      { path: '/membership-payment', component: MembershipPaymentList },
      { path: '/membership-payment/new', component: MembershipPaymentForm },
      { path: '/membership-payment/:id/edit', component: MembershipPaymentForm },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
