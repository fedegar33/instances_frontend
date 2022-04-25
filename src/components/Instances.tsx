import { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import InstancesTable from './InstancesTable'
import { getInstances, EC2Instance } from '../services/instancesService'
import Button from '@mui/material/Button'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'

function Instances(): JSX.Element {
  const [instances, setInstances] = useState<EC2Instance[]>([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  useEffect(() => {
    async function getData() {
      const { success, instances, errorMessage } = await getInstances()
      if (success) {
        setInstances(instances || [])
      } else {
        setError(errorMessage || '')
      }
      setLoading(false)
    }

    getData()
  }, [])

  async function handleCopyDataAsCsv(e: React.MouseEvent<HTMLButtonElement>): Promise<void> {
    const csvHeader = Object.keys(instances[0]).join(';')
    const csvBody = instances
      .map(instance => Object.values(instance).join(';'))
      .join('\n')
    const csvData = `${csvHeader}\n${csvBody}`

    await window.navigator.clipboard.writeText(csvData)
    
    setSnackbarOpen(true)
  }

  function handleCloseSnackbar() {
    setSnackbarOpen(false);
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', py: 3 }}>
        <Typography variant="h6">
          Current EC2 instances
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={handleCopyDataAsCsv}
        >
          Copy data as CSV
        </Button>
      </Box>
      <InstancesTable
        instances={instances}
        loading={loading}
        error={error}
      />
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success">
          Instances data copied as CSV to your clipboard.
        </Alert>
      </Snackbar>
    </>
  )
}

export default Instances