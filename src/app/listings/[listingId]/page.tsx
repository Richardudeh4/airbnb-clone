import getCurrentUser from '(@/app/actions/getCurrentUser)';
import getListingById from '(@/app/actions/getListingById)'
import getReservations from '(@/app/actions/getReservations)';
import ClientOnly from '(@/components/ClientOnly)';
import EmptyState from '(@/components/EmptyState)';
import ListingClient from './ListingClient';
import React from 'react'

interface Iparams {
  listingId?: string;

}
const ListingPage = async ({ params }: {params: Iparams}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
const currentUser = await getCurrentUser();
  if(!listing){
    return (
      <ClientOnly>
        <EmptyState/>
      </ClientOnly>
    )
  }
  return (
    <ClientOnly>
      <ListingClient listing={listing} reservations={reservations} currentUser={currentUser}/>
     
    </ClientOnly>
  )
}

export default ListingPage