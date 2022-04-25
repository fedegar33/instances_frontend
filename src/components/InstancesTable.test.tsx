import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import InstancesTable from './InstancesTable'
import { EC2Instance, InstanceSizes, InstanceStates } from '../services/instancesService'

describe('InstancesTable', () => {
  test('renders instances table and its header', () => {
    const instances: EC2Instance[] = []
    const loading = false
    const error = ''

    render(
      <MemoryRouter>
        <InstancesTable instances={instances} loading={loading} error={error} />
      </MemoryRouter>
    )

    const table = screen.getByRole('table')
    const headers = screen.getAllByRole('columnheader')

    expect(table).toBeInTheDocument();
    expect(headers.length).toBe(7)
  })

  test('renders correct instance data', () => {
    const instances: EC2Instance[] = [
      {
        id: "i8b226aa007571ea0",
        name: "Y5 MICRO",
        az: "us-west-12",
        size: InstanceSizes.Micro,
        state: InstanceStates.Running,
        type: "y5.micro",
        privateIp: "52.198.251.243",
        publicIp: "65.31.186.193"
      },
      {
        id: "i8b226aa007571ea1",
        name: "Y5 MEDIUM",
        az: "us-west-12",
        size: InstanceSizes.Medium,
        state: InstanceStates.Pending,
        type: "y5.medium",
        privateIp: "52.198.251.243",
        publicIp: "65.31.186.193"
      },
      {
        id: "i8b226aa007571ea2",
        name: "Y5 LARGE",
        az: "us-west-12",
        size: InstanceSizes.Large,
        state: InstanceStates.Stopping,
        type: "y5.large",
        privateIp: "52.198.251.243",
        publicIp: "65.31.186.193"
      },
      {
        id: "i8b226aa007571ea3",
        name: "Y5 XLARGE",
        az: "us-west-12",
        size: InstanceSizes.XLarge,
        state: InstanceStates.Stopped,
        type: "y5.xlarge",
        privateIp: "52.198.251.243",
        publicIp: "65.31.186.193"
      }
    ]
    const loading = false
    const error = ''

    render(
      <MemoryRouter>
        <InstancesTable instances={instances} loading={loading} error={error} />
      </MemoryRouter>
    )

    const rows = screen.getAllByRole('row')
    const cells = screen.getAllByRole('cell')

    const CheckCircleOutlineOutlinedIcon = screen.getByTestId('CheckCircleOutlineOutlinedIcon')
    const DoDisturbOnOutlinedIcon = screen.getByTestId('DoDisturbOnOutlinedIcon')
    const ErrorOutlineOutlinedIcon = screen.getByTestId('ErrorOutlineOutlinedIcon')
    const CancelOutlinedIcon = screen.getByTestId('CancelOutlinedIcon')

    expect(rows.length).toBe(5) // instances.length + header row
    expect(cells.length).toBe(28)

    expect(cells[3]).toContainElement(CheckCircleOutlineOutlinedIcon)
    expect(cells[10]).toContainElement(DoDisturbOnOutlinedIcon)
    expect(cells[17]).toContainElement(ErrorOutlineOutlinedIcon)
    expect(cells[24]).toContainElement(CancelOutlinedIcon)
  })

  test('renders loading indicator when data it\'s been loading', () => {
    const instances: EC2Instance[] = []
    const loading = true
    const error = ''

    render(
      <MemoryRouter>
        <InstancesTable instances={instances} loading={loading} error={error} />
      </MemoryRouter>
    )

    const progressBar = screen.getByRole('progressbar')
    const loadingText = screen.getByRole('paragraph')

    expect(progressBar).toBeInTheDocument()
    expect(loadingText).toBeInTheDocument()
  })

  test('renders error message when an error has ocurred', () => {
    const instances: EC2Instance[] = []
    const loading = false
    const error = 'some error'

    render(
      <MemoryRouter>
        <InstancesTable instances={instances} loading={loading} error={error} />
      </MemoryRouter>
    )

    const alert = screen.getByRole('alert')

    expect(alert).toBeInTheDocument();
    expect(alert).toHaveTextContent('some error')
  })
})
