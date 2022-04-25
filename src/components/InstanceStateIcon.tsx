import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined'
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined'
import DoDisturbOnOutlinedIcon from '@mui/icons-material/DoDisturbOnOutlined'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'

type Props = {
  state: string
}

function InstanceStateIcon({ state }: Props): JSX.Element {
  function getStateIcon(state: string): JSX.Element {
    switch (state) {
      case 'Running':
        return <CheckCircleOutlineOutlined />
      case 'Stopping':
        return <ErrorOutlineOutlinedIcon />
      case 'Stopped':
        return <CancelOutlinedIcon />
      case 'Pending':
      default:
        return <DoDisturbOnOutlinedIcon />
    }
  }

  return getStateIcon(state)
}

export default InstanceStateIcon
