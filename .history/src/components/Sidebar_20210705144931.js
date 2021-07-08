import '../styles/Sidebar.css'
import { useState, useEffect } from 'react'
import { auth } from '../firebase'
import SidebarRow from "../components/SidebarRow";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import PeopleIcon from "@material-ui/icons/People";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import { BrowserRouter as Router } from 'react-router-dom'
import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';
import CreateIcon from '@material-ui/icons/Create'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import { CometChat } from '@cometchat-pro/chat'
import { Link, useHistory } from 'react-router-dom'

function Sidebar() {
    const [channels, setChannels] = useState([])
    const [user, setUser] = useState(null)
    const [dms, setDms] = useState([])
    const history = useHistory()

    const getDirectMessages = () => {
        const limit = 10
        const usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(limit)
            .friendsOnly(true)
            .build()

        usersRequest
            .fetchNext()
            .then((userList) => setDms(userList))
            .catch((error) => {
                console.log('User list fetching failed with error:', error)
            })
    }

    const getChannels = () => {
        const limit = 30
        const groupsRequest = new CometChat.GroupsRequestBuilder()
            .setLimit(limit)
            .joinedOnly(true)
            .build()

        groupsRequest
            .fetchNext()
            .then((groupList) => setChannels(groupList))
            .catch((error) => {
                console.log('Groups list fetching failed with error', error)
            })
    }

    const logOut = () => {
        auth
            .signOut()
            .then(() => {
                localStorage.removeItem('user')
                history.push('/login')
            })
            .catch((error) => console.log(error.message))
    }

    useEffect(() => {
        const data = localStorage.getItem('user')
        setUser(JSON.parse(data))

        getChannels()
        getDirectMessages()
    }, [])

    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="sidebar__info">
                    <h2>
                    </h2>
                    <SidebarRow src={user?.photoURL} title={user?.displayName} />
                    <SidebarRow Icon={LocalHospitalIcon} title="Covid-19 Information Center" />
                    <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
                    <SidebarRow Icon={PeopleIcon} title="Friends" />
                    <Router><SidebarRow Icon={ChatIcon} title="Messenger" /></Router>
                    <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
                    <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
                    <SidebarRow Icon={ExpandMoreOutlinedIcon} title="Marketplace" />
                    <br><br></br></br>
                </div>
                {/* <CreateIcon /> */}
            </div>
            {/* <div className="sidebar__options">
                <SidebarOption Icon={InsertCommentIcon} title="Thread" />
                <SidebarOption Icon={AlternateEmailIcon} title="Mentions & Reactions" />
                <SidebarOption Icon={MoreVertIcon} title="More" />
                <hr />
                <SidebarOption Icon={ArrowDropDownIcon} title="Channels" />
                <hr />
                {channels.map((channel) =>
                    channel.type === 'private' ? (
                        <SidebarOption
                            Icon={LockOutlinedIcon}
                            title={channel.name}
                            id={channel.guid}
                            key={channel.guid}
                            sub="sidebarOption__sub"
                        />
                    ) : (
                        <SidebarOption
                            title={channel.name}
                            id={channel.guid}
                            key={channel.guid}
                            sub="sidebarOption__sub"
                        />
                    )
                )}

                <SidebarOption
                    Icon={AddIcon}
                    title="Add Channel"
                    sub="sidebarOption__sub"
                    addChannelOption
                />
                <hr />
                <SidebarOption Icon={ArrowDropDownIcon} title="Direct Messages" />
                <hr />
                {dms.map((dm) => (
                    <SidebarOption
                        Icon={FiberManualRecordIcon}
                        title={dm.name}
                        id={dm.uid}
                        key={dm.uid}
                        sub="sidebarOption__sub sidebarOption__color"
                        user
                        online={dm.status === 'online' ? 'isOnline' : ''}
                    />
                ))}
            </div> */}

            <button className="sidebar__logout" onClick={logOut}>
                Logout
            </button>
        </div>
    )
}

export default Sidebar