import { RoomGrid } from "@/features/rooms/components/room-grid";

const TENANT_ID = 'eb8ed863-aef4-46bb-8d33-edb7387e246c'

export default function RoomsPage() {
    return ( 
        <div className="p-6">
            <RoomGrid tenantId={TENANT_ID} />
        </div>
     );
}
