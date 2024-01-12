import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "../types";

import useLoginModal from "./useLoginModal";
interface IUseFavourite {
    listingId: string;
    currentUser?: SafeUser | null; 
}

const useFavourite = ({
    listingId,
    currentUser
}: IUseFavourite) => {
    const router = useRouter();
    const loginModal = useLoginModal();

    const hasFavourited = useMemo(() => {
        const list = currentUser?.favoriteIds || [];

        return list.includes(listingId);
    }, [currentUser, listingId]);

    const toggleFavourite = useCallback(async (
        e: React.MouseEvent<HTMLDivElement>
    ) => {
        e.stopPropagation();

        if(!currentUser) {
            return loginModal.onOpen();
        }
        try{
            let request;

            if(hasFavourited){
                request = () => axios.delete(`/api/favourite/${listingId}`);
            }
            else{
                request = () => axios.post(`/api/favourite/${listingId}`);
            }
            await request();
            router.refresh();
            toast.success('Success');
        }
        catch(error) {
            toast.error('Something went wrong');
        }
    },[ currentUser, hasFavourited,loginModal,listingId,router]);
    return {
        hasFavourited, toggleFavourite
    }
}

export default useFavourite;