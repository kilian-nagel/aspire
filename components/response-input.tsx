import {useState} from "react";
import {TextAreaAction} from "@/components/text-area-action";
import {Post} from "@/models/posts/posts.types";

export const ResponseInput: React.FC<Post> = ({content, id}) => {
    const [btn_clicked] = useState(0);

    return (
        <div className="fixed">
            <p>Response to guest</p>
            <TextAreaAction {...{content, id, confirm_button_clicked: btn_clicked, data_type: "comment"}}></TextAreaAction>
        </div>)
}
