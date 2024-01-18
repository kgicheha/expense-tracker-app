import React, { useState} from "react";
import { Tabs, Tab, Box } from "@mui/material";

function TabsContainer({setValue, value}) {
  const [tabValue, setTabValue] = useState("one");
  const handleChange = (event, newValue) => {
    console.log(newValue)
    setTabValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          bgcolor: "background.paper",
          marginBottom: "60px",
        }}
      >
        <Tabs
          value={tabValue}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          centered
        >
          <Tab value="one" label="Spending Overview"
          href="/"

          />
          <Tab value="two" label="Transaction History"
          href="/history"
           />
          <Tab value="three" label="Add New Expenses"
          href="/newexpenses"

          />
        </Tabs>
      </Box>
    </>
  );
}

export default TabsContainer;
