import EmptyState from "(@/components/EmptyState)";
import ClientOnly from "(@/components/ClientOnly)";
import ReservationsClient from "./ReservationsClient";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title="Unauthorized" subtitle="Please login "/>
            </ClientOnly>
        );
    }

    const reservations = await getReservations({
        authorId: currentUser.id
    });
    if(reservations.length == 0){
        return (
            <ClientOnly>
                <EmptyState title=" No reservations found" subtitle="Looks like you have no reservation on your property"/>
            </ClientOnly>
        )
    }
    return (
        <ClientOnly>
        <ReservationsClient 
        reservations={reservations}
        currentUser={currentUser}/>
        </ClientOnly>
    )
}
export default ReservationsPage