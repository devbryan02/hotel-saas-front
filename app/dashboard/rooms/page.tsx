import { RoomTable } from "@/features/rooms/components/room-table";

const TENANT_ID = 'eb8ed863-aef4-46bb-8d33-edb7387e246c'

export default function RoomsPage() {
    return ( 
        <div className="p-6">
            <RoomTable tenantId={TENANT_ID} />
        </div>
     );
}
