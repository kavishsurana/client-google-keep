

import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { LightbulbOutlined as Lightbulb} from '@mui/icons-material';


const NavList = () => {

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '/' }
    ]
    
    return (
        <List>
        {
            navList.map(list => (
                <ListItem key={list.id}>
                    <div style={{ textDecoration: 'none', display: 'flex', color: 'inherit'}}>
                        <ListItemIcon style={{ alignItems: 'center'}}>
                            {list.icon}
                        </ListItemIcon>
                        <ListItemText primary={list.name} />
                    </div>
                </ListItem>
            ))
        }
        </List>
    )
}

export default NavList;