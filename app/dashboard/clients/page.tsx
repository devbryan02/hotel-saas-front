import { ClientTable } from '@/features/clients/components/client-table'

const TENANT_ID = 'eb8ed863-aef4-46bb-8d33-edb7387e246c' 

export default function ClientsPage() {
  return (
    <div className="p-6">
      <ClientTable tenantId={TENANT_ID} />
    </div>
  )
}