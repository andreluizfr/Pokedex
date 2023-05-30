export default function formatId(id: string, hashtag: boolean){

    if(hashtag)
        switch(id.length){
            case 1:
                return "#00"+id;
            
            case 2:
                return "#0"+id;
            
            case 3:
                return "#"+id;
            
            case 4:
                return "#"+id;

            default:
                return null;
        }
    else
        switch(id.length){
            case 1:
                return "00"+id;
            
            case 2:
                return "0"+id;
            
            case 3:
                return id;
            
            case 4:
                return id;

            default:
                return null;
        }

}