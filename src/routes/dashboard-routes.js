import FullScreenLoader from '../components/FullScreenLoader'
import Loadable from 'react-loadable'

const Status = Loadable({
  loader: () => import('../views/status/Index'),
  loading: FullScreenLoader,
})
const StatusCreate = Loadable({
  loader: () => import('../views/status/Create'),
  loading: FullScreenLoader,
})
const Property = Loadable({
  loader: () => import('../views/property/Index'),
  loading: FullScreenLoader,
})
const PropertyCreate = Loadable({
  loader: () => import('../views/property/Create'),
  loading: FullScreenLoader,
})
const GroupProperty = Loadable({
  loader: () => import('../views/groupProperty/index'),
  loading: FullScreenLoader,
})
const CreateGroupProperty = Loadable({
  loader: () => import('../views/groupProperty/Create'),
  loading: FullScreenLoader,
})
const NewOffers = Loadable({
  loader: () => import('../views/new-offers/Index'),
  loading: FullScreenLoader,
})
const NewOffersView = Loadable({
  loader: () => import('../views/new-offers/View'),
  loading: FullScreenLoader,
})
const Organizations = Loadable({
  loader: () => import('../views/organizations/Index.jsx'),
  loading: FullScreenLoader,
})

const OrganizationsCreate = Loadable({
  loader: () => import('../views/organizations/Create/index'),
  loading: FullScreenLoader,
})
const Roles = Loadable({
  loader: () => import('../views/roles/Index.jsx'),
  loading: FullScreenLoader,
})
const RolesCreate = Loadable({
  loader: () => import('../views/roles/Create'),
  loading: FullScreenLoader,
})
const OpenMap = Loadable({
  loader: () => import('../views/openMap/index'),
  loading: FullScreenLoader,
})
const Users__Premises = Loadable({
  loader: () => import('../views/users/premises'),
  loading: FullScreenLoader,
})
const Users__PremisesCreate = Loadable({
  loader: () => import('../views/users/premises/Create'),
  loading: FullScreenLoader,
})
const Announcement = Loadable({
  loader: () => import('../views/announcement/index.jsx'),
  loading: FullScreenLoader
})
const Districts = Loadable({
  loader: () => import('../views/districts'),
  loading: FullScreenLoader,
})
const DistrictsCreate = Loadable({
  loader: () => import('../views/districts/Create'),
  loading: FullScreenLoader,
})
const Profile = Loadable({
  loader: () => import('../views/profile'),
  loading: FullScreenLoader,
})
const Applicant = Loadable({
  loader: () => import('../views/applicant/index'),
  loading: FullScreenLoader,
})
const ApplicantView = Loadable({
  loader: () => import('../views/applicant/View'),
  loading: FullScreenLoader,
})
const Reload = Loadable({
  loader: () => import('../views/reload'),
  loading: FullScreenLoader,
})

export default [

  {
    component: NewOffers,
    path: '/new-offers',
    exact: true,
    title: 'NewOffers',
    permission: 'new_offers',
  },

  {
    component: NewOffersView,
    path: '/new-offers/:id',
    exact: true,
    title: 'NewOffersView',
    permission: 'new_offers_view',
  },
  {
    component: Status,
    path: '/settings/status',
    exact: true,
    title: 'Status',
    permission: 'settings_status',
  },
  {
    component: StatusCreate,
    path: '/settings/status/create',
    exact: true,
    title: 'StatusCreate',
    permission: 'settings_status_create',
  },
  {
    component: StatusCreate,
    path: '/settings/status/:id',
    exact: true,
    title: 'StatusEdit',
    permission: 'settings_status_edit',
  },
  {
    component: Organizations,
    path: '/settings/organizations',
    exact: true,
    title: 'Organizations',
    permission: 'settings_organization',
  },
  {
    component: OrganizationsCreate,
    path: '/settings/organizations/create',
    exact: true,
    title: 'OrganizationsCreate',
    permission: 'settings_organization_create',
  },

  {
    component: OrganizationsCreate,
    path: '/settings/organizations/:id',
    exact: true,
    title: 'OrganizationsEdit',
    permission: 'settings_organization_edit',
  },

  {
    component: Districts,
    path: '/settings/districts',
    exact: true,
    title: 'Districts',
    permission: 'settings_organization_edit',
  },

  {
    component: DistrictsCreate,
    path: '/settings/districts/create',
    exact: true,
    title: 'DistrictsCreate',
    permission: 'settings_organization_edit',
  },

  {
    component: DistrictsCreate,
    path: '/settings/districts/:id',
    exact: true,
    title: 'DistrictsEdit',
    permission: 'settings_organization_edit',
  },

  {
    component: Roles,
    path: '/settings/roles',
    exact: true,
    title: 'Roles',
    permission: 'settings_roles',
  },
  {
    component: RolesCreate,
    path: '/settings/roles/create',
    exact: true,
    title: 'RolesCreate',
    permission: 'settings_roles_create',
  },
  {
    component: RolesCreate,
    path: '/settings/roles/:id',
    exact: true,
    title: 'RolesEdit',
    permission: 'settings_roles_edit',
  },
  {
    component: Property,
    path: '/settings/property',
    exact: true,
    title: 'Property',
    permission: 'settings_property',
  },
  {
    component: PropertyCreate,
    path: '/settings/property/create',
    exact: true,
    title: 'PropertyCreate',
    permission: 'settings_property_create',
  },
  {
    component: PropertyCreate,
    path: '/settings/property/:id',
    exact: true,
    title: 'PropertyEdit',
    permission: 'settings/property_edit',
  },
  {
    component: GroupProperty,
    path: '/settings/group-property',
    exact: true,
    title: 'GroupProperty',
    permission: 'settings_group_property',
  },
  {
    component: CreateGroupProperty,
    path: '/settings/group-property/create',
    exact: true,
    title: 'CreateGroupProperty',
    permission: 'settings_group_property_create',
  },
  {
    component: CreateGroupProperty,
    path: '/settings/group-property/:id',
    exact: true,
    title: 'CreateGroupProperty',
    permission: 'settings_group_property_edit',
  },
  {
    component: Announcement,
    path: '/settings/announcement',
    exact: true,
    title: 'Announcement',
    permission: 'settings_permission_system'
  },
  {
    component: OpenMap,
    path: '/open-map',
    exact: true,
    title: 'openMap',
    permission: 'open_map',
  },
  {
    component: Users__Premises,
    path: '/users/premises',
    exact: true,
    title: 'Users__Premises',
    permission: 'users_premises',
  },

  {
    component: Users__PremisesCreate,
    path: '/users/premises/create',
    exact: true,
    title: 'Users__PremisesCreate',
    permission: 'users_premises_create',
  },

  {
    component: Users__PremisesCreate,
    path: '/users/premises/:id',
    exact: true,
    title: 'Users__PremisesEdit',
    permission: 'users_premises_edit',
  },

  {
    component: Applicant,
    path: '/users/applicant',
    exact: true,
    title: 'Applicant',
    permission: 'users_applicant',
  },
  {
    component: ApplicantView,
    path: '/users/applicant/:id',
    exact: true,
    title: 'ApplicantView',
    permission: 'users_applicant_view',
  },
  {
    component: Profile,
    path: '/profile',
    exact: true,
    title: 'Profile',
    permission: 'profile',
  },

  {
    component: Reload,
    path: '/reload',
    exact: true,
    title: 'Reload',
    permission: 'dashboard',
  },

].map((route) => ({
  ...route,
  path: `/home${route.path}`,
  id: Math.random() + new Date().getTime(),
}))
