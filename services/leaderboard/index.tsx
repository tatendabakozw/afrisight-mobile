import { LEADERBOARD_ROUTES } from "@/constants/routers";
import { axiosInstance } from "@/utils/axios";
import { useQuery } from "@tanstack/react-query";
import { createContext, useContext } from "react";

export type LeaderBoard = {
    rank: {
        index: number;
        points: number;
    }
    rankings: {
        points: number;
        profile: {
            _id: string;
            firstname: string;
            surname: string;
        }
    }[]
    refetch: () => void;
    error?: {
        rank?: string;
        rankings?: string;
    }
}

const LeaderBoardContext = createContext<LeaderBoard | null>(null);

export const useLeaderBoard = () => {
    const context = useContext(LeaderBoardContext);
    if (!context) {
        throw new Error("useLeaderBoard must be used within a LeaderBoardProvider");
    }
    return context;
}

export const LeaderBoardProvider = ({ children }: { children: React.ReactNode }) => {
    const leaderBoardQuery = useQuery({
        queryKey: ["leaderboard"],
        queryFn: () => getLeaderBoard(),
    });

    const rankQuery = useQuery({
        queryKey: ["leaderboard", "rank"],
        queryFn: () => getLeaderBoardRank(),
    });

    const getLeaderBoard = async () => {
        const response = await axiosInstance.get(LEADERBOARD_ROUTES.GET_LEADERBOARD);
        return response.data;
    }

    const getLeaderBoardRank = async () => {
        const response = await axiosInstance.get(LEADERBOARD_ROUTES.GET_LEADERBOARD_RANK);
        return response.data;
    }


    return (
        <LeaderBoardContext.Provider value={{
            rank: {
                index: rankQuery.data?.index,
                points: rankQuery.data?.points,
            },
            rankings: leaderBoardQuery.data,
            refetch: () => {
                leaderBoardQuery.refetch();
                rankQuery.refetch();
            },
            error: {
                rank: rankQuery.error?.message,
                rankings: leaderBoardQuery.error?.message,
            }
        }}>
            {children}
        </LeaderBoardContext.Provider>
    )
}