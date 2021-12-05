import { Work, AccountBalance, Map, Edit, Group, Assessment, AccountBalanceWallet, Settings, AttachMoney } from '@material-ui/icons'

const routes = [
  {
    id: 'new-offers',
    title: 'new.offers',
    path: '/home/new-offers',
    isActive: false,
    icon: Work,
    permission: 'new_offers'
  },
  {
    id: 'open-card',
    title: 'open.card',
    path: '/home/open-map',
    isActive: false,
    icon: Map,
    permission: 'open_map'
  },
  {
    id: 'users',
    title: 'users',
    path: '/home/users',
    isActive: false,
    icon: Group,
    children: [
      {
        id: 'organization.users',
        title: 'organization.users',
        path: '/home/users/premises',
        isChild: true,
        permission: 'users_premises'
      },
      {
        id: 'applicant',
        title: 'applicants',
        path: '/home/users/applicant',
        isChild: true,
        permission: 'users_applicant'
      },
    ],
  },
  // {
  //   id: 'reports',
  //   title: 'reports',
  //   path: '/home/reports',
  //   isActive: false,
  //   icon: Assessment,
  //   permission: 'dashboard'
  // },

  {
    id: 'settings',
    title: 'settings',
    path: '/home/settings',
    isActive: true,
    icon: Settings,
    children: [
      {
          id: 'announcement',
          title: 'announcement',
          path: '/home/settings/announcement',
          isChild: true,
          permission: 'settings_permission_system'
      },
      {
        id: 'districts',
        title: 'districts',
        path: '/home/settings/districts',
        isChild: true,
        permission: 'settings_organization_edit'
      },
      {
        id: 'organizations',
        title: 'organizations',
        path: '/home/settings/organizations',
        isChild: true,
        permission: 'settings_organization'
      },
      {
        id: 'roles',
        title: 'roles',
        path: '/home/settings/roles',
        isChild: true,
        permission: 'settings_roles'
      },
      {
        id: 'application.statuses',
        title: 'application.statuses',
        path: '/home/settings/status',
        isChild: true,
        permission: 'settings_status'
      },
      {
        id: 'application.fields',
        title: 'application.fields',
        path: '/home/settings/property',
        isChild: true,
        permission: 'settings_property'
      },
      {
        id: 'application.field.groups',
        title: 'application.field.groups',
        path: '/home/settings/group-property',
        isChild: true,
        permission: 'settings_group_property'
      },
    ],
  },
]

export default routes
