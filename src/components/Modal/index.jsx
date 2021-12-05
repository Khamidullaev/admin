import './style.scss'
import { Modal } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Button from '../../components/Button'
import { useTranslation } from 'react-i18next'

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const CModal = ({
  open,
  close,
  confirm,
  onClose,
  onConfirm,
  title,
  footer,
  loading,
  className,
  style,
  width = 560,
  children,
  ...props
}) => {
  const classes = useStyles()
  const { t } = useTranslation()

  const buttons = [
    <Button
      style={{ width: '160px' }}
      size='large'
      color='gray'
      className='flex justify-center'
      onClick={onClose}
    >
      {close || t('cancel')}
    </Button>,
    <Button
      style={{ width: '160px' }}
      className='ml-2 flex justify-center'
      size='large'
      color='red'
      onClick={onConfirm}
      loading={loading}
    >
      {confirm || t('ok')}
    </Button>,
  ]

  return (
    <Modal
      aria-labelledby='transition-modal-title'
      aria-describedby='transition-modal-description'
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
      {...props}
    >
      <Fade in={open}>
        <div
          className={`modal-component p-6 rounded-md bg-white ${className}`}
          style={{ ...style, width }}
        >
          {title !== null && (
            <p className='modal-title whitespace-pre-wrap max-w-xs'>
              {title || t('are.you.sure.want.to.delete')}
            </p>
          )}
          {children}
          {footer !== null && (
            <div className='buttons-row flex justify-end mt-5'>
              {footer ?? buttons}
            </div>
          )}
        </div>
      </Fade>
    </Modal>
  )
}

export default CModal
