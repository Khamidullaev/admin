import DashboardIcon from '@material-ui/icons/Dashboard'
import WorkIcon from '@material-ui/icons/Work'
import AccountBalanceIcon from '@material-ui/icons/AccountBalance'
import MapIcon from '@material-ui/icons/Map'
import GroupIcon from '@material-ui/icons/Group'
import AssessmentIcon from '@material-ui/icons/Assessment'
import SettingsIcon from '@material-ui/icons/Settings'
import Money from '@material-ui/icons/AttachMoney'

export default function iconFinder(name) {
  switch (name) {
    case 'DashboardIcon':
      return <DashboardIcon />
    case 'WorkIcon':
      return <WorkIcon />
    case 'AccountBalanceIcon':
      return <AccountBalanceIcon />
    case 'MapIcon':
      return <MapIcon />
    case 'GroupIcon':
      return <GroupIcon />
    case 'AssessmentIcon':
      return <AssessmentIcon />
    case 'TaxIcon':
      return <Money />
    case 'SettingsIcon':
      return <SettingsIcon />
    case 'District':
      return <MapIcon />
    default:
      return <DashboardIcon />
  }
}
export const DragAndDrop = () => (
  <svg
    width='15'
    height='16'
    viewBox='0 0 15 16'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
  >
    <path
      fill-rule='evenodd'
      clip-rule='evenodd'
      d='M0.5 14.9998C0.5 14.7346 0.605357 14.4802 0.792893 14.2927C0.98043 14.1051 1.23478 13.9998 1.5 13.9998H13.5C13.7652 13.9998 14.0196 14.1051 14.2071 14.2927C14.3946 14.4802 14.5 14.7346 14.5 14.9998C14.5 15.265 14.3946 15.5194 14.2071 15.7069C14.0196 15.8944 13.7652 15.9998 13.5 15.9998H1.5C1.23478 15.9998 0.98043 15.8944 0.792893 15.7069C0.605357 15.5194 0.5 15.265 0.5 14.9998ZM3.793 4.70679C3.60553 4.51926 3.50021 4.26495 3.50021 3.99979C3.50021 3.73462 3.60553 3.48031 3.793 3.29279L6.793 0.292786C6.98053 0.105315 7.23484 0 7.5 0C7.76516 0 8.01947 0.105315 8.207 0.292786L11.207 3.29279C11.3892 3.48139 11.49 3.73399 11.4877 3.99619C11.4854 4.25838 11.3802 4.5092 11.1948 4.6946C11.0094 4.88001 10.7586 4.98518 10.4964 4.98746C10.2342 4.98974 9.9816 4.88894 9.793 4.70679L8.5 3.41379V10.9998C8.5 11.265 8.39464 11.5194 8.20711 11.7069C8.01957 11.8944 7.76522 11.9998 7.5 11.9998C7.23478 11.9998 6.98043 11.8944 6.79289 11.7069C6.60536 11.5194 6.5 11.265 6.5 10.9998V3.41379L5.207 4.70679C5.01947 4.89426 4.76516 4.99957 4.5 4.99957C4.23484 4.99957 3.98053 4.89426 3.793 4.70679V4.70679Z'
      fill='#B0BABF'
    />
  </svg>
)
