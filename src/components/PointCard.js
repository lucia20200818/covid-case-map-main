import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    circle: {
        height: "25px",
        width: "25px",
        backgroundColor: "red",
        borderRadius: "50%",
        display: "inline-block",
        opacity: "0.5"
    },
});

export default function PointCard(props) {
    const classes = useStyles();
    const [showDetail, setShowDetail] = useState(false);

    if (!showDetail) {
        return (
            <div className={classes.circle} onClick={toggleDetail}>

            </div>
        );
    }
    return (
        <Card className={classes.root} onClick={toggleDetail}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    County: {props.county}
                </Typography>
                <Typography variant="body2" component="p">
                    Confirmed: {props.stats.confirmed}
                </Typography>
                <Typography variant="body2" component="p">
                    Death: {props.stats.deaths}
                </Typography>
                <Typography variant="body2" component="p">
                    Recovered: {props.stats.recovered}
                </Typography>
            </CardContent>
        </Card>
    );

    function toggleDetail() {
        setShowDetail(prevState => !prevState);
    }
}
