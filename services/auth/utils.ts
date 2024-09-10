import { User } from "./";

export const getUserDisplayName = (user: User) => {
    return user?.profile.firstname && user?.profile.surname ? (user.profile.firstname + " " + user.profile.surname) : (user?._id.slice(0, 3) + "..." + user?._id.slice(-6));
}

export const getLeaderboardDisplayName = (profile: {
    firstname?: string,
    surname?: string,
    _id: string
}) => {
    return profile.firstname ?? profile._id.slice(0, 3) + "..." + profile._id.slice(-6)
}

export const getUserBalance = (user: User) => {
    return "US" + Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(user.balance ?? 0)
}

export const getUserPointsFormatted = (points: number = 0) => {
    return points.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
