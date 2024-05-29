import { Stack } from "@mui/material";

const Schedule = ({ itemList, userId }) => {
  let itemNumber = 0;

  return (
    <Stack>
      <table style={{ width: "100%" }}>
        <thead>
          <tr>
            <th style={{ width: "20px" }} className="text-center">Number</th>
            <th style={{ width: "200px" }} className="text-center">Car Model</th>
            <th style={{ width: "300px" }} className="text-center">Car Color</th>
            <th style={{ width: "200px" }} className="text-center">Made In City</th>
          </tr>
        </thead>
        <tbody>
          {itemList
            ? itemList.map((item, index) => {
                if (userId === item.userId) {
                  itemNumber += 1;
                  return (
                    <tr key={index}>
                      <td>{itemNumber}</td>
                      <td>{item.name}</td>
                      <td>{item.description}</td>
                      <td>{item.city}</td>
                    </tr>
                  );
                }
                return null;
              })
            : null}
        </tbody>
      </table>
    </Stack>
  );
};

export default Schedule;
