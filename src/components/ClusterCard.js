import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275
    },
    title: {
        fontSize: 14,
    },
});

export default function ClusterCard(props) {
    const classes = useStyles();
    const title = props.nation ? `Country: ${props.nation}` : `State: ${props.state}`;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {title}
                </Typography>
                <Typography variant="body2" component="p">
                    Confirmed: {props.confirmed}
                </Typography>
            </CardContent>
        </Card>
    );
}
