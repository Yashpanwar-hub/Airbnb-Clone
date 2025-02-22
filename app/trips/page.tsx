import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservation'
import TripsClient from './TripsClient'

const TripsPage = async() => {
    const currentUser = await getCurrentUser();
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState title='Unauthorized' subtitle='Please login'/>
            </ClientOnly>
  )
}
const reservation = await getReservations({
    userId: currentUser.id
})
if(reservation.length===0){
    return (
        <ClientOnly>
            <EmptyState title='No Trips found' subtitle='Looks like you havent reserved any trips.'/>
            </ClientOnly>
    )
}
return (
    <ClientOnly>
        <TripsClient reservation={reservation} currentUser={currentUser}/>
    </ClientOnly>
)
}

export default TripsPage
