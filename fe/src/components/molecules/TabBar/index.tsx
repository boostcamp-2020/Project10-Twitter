import React, { FunctionComponent } from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface Props {
  value: string;
  handleChange: (event: React.ChangeEvent<{}>, newValue: string) => void;
  labels: string[];
}

const TabBar: FunctionComponent<Props> = ({ value, handleChange, labels }) => {
  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        variant="fullWidth"
      >
        {labels.map((label, index) => (
          <Tab key={index} label={label} value={label} />
        ))}
      </Tabs>
    </Paper>
  );
};

export default TabBar;
