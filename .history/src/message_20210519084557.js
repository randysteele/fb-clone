import React from 'react'
import { CometChatGroupList } from "./CometChatWorkspace/src/components/Groups/CometChatGroupList";
// /Users/randysteele/projects/fb-clone/src/CometChatWorkspace/src/components/Groups/CometChatGroupList
import { AuthContext } from './authcontext'

export const Message = () => {
    const { logout } = React.useContext(AuthContext)


    return (
        <div>
            <button onClick={logout}>logout</button>
            <CometChatGroupListScreen />
        </div>


    )
}