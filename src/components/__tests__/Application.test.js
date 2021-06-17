import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import {
  render,
  cleanup, waitForElement, fireEvent,
  prettyDOM, getByText, getAllByTestId,
  getByAltText,
  getByPlaceholderText,
  queryByText,
  queryByAltText
} from "@testing-library/react";
/* somewhere near the top */
import axios from "axios";
import useApplicationData from "../../hooks/useApplicationData";
import Application from "components/Application";

describe("Appointment", () => {
  afterEach(cleanup);
  it("changes the schedule when a new day is selected", () => {
    const { getByText } = render(<Application />);
    console.log(1);
    return waitForElement(() => getByText("Monday")).then(() => {
      fireEvent.click(getByText("Tuesday"));

      expect(getByText("Leopold Silvers")).toBeInTheDocument();
    });
  });





  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    cleanup();
    const { container, debug } = render(<Application />);
    // cleanup();

    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));

    // 3. Click the "Delete" button on the booked appointment.
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );

    fireEvent.click(queryByAltText(appointment, "Delete"));

    // 4. Check that the confirmation message is shown.
    expect(
      getByText(appointment, "Are you sure you would like to delete?")
    ).toBeInTheDocument();

    // 5. Click the "Confirm" button on the confirmation.
    fireEvent.click(queryByText(appointment, "Confirm"));

    // 6. Check that the element with the text "Deleting" is displayed.
    expect(getByText(appointment, "DELETING")).toBeInTheDocument();

    // 7. Wait until the element with the "Add" button is displayed.
    //await waitForElement(() => getByAltText(appointment, "Add"));
    await new Promise((res) => setTimeout(res, 2000));
    // 8. Check that the DayListItem with the text "Monday" also has the text "2 spots remaining".
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    console.log(3);
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    debug();
  });


  // it("loads data, books an interview and reduces the spots remaining for Monday by 1", async () => {
  //   const { result } = renderHook(() => useApplicationData())
  //   console.log(renderHook(() => useApplicationData()));
  //   await new Promise(res => act(() => { result.current.reset().then(res) }))
  //   const { container, debug } = render(<Application />);
  //   console.log(2);
  //   await waitForElement(() => getByText(container, "Archie Cohen"));
  //   const initial_day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );
  //   console.log(prettyDOM(initial_day));

  //   const appointments = getAllByTestId(container, "appointment");
  //   const appointment = appointments[0];

  //   fireEvent.click(getByAltText(appointment, "Add"));

  //   fireEvent.change(getByPlaceholderText(appointment, /enter student name/i), {
  //     target: { value: "Lydia Miller-Jones" }
  //   });

  //   fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
  //   fireEvent.click(getByText(appointment, "Save"));

  //   expect(getByText(appointment, "SAVING")).toBeInTheDocument();

  //   await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

  //   const day = getAllByTestId(container, "day").find(day =>
  //     queryByText(day, "Monday")
  //   );

  //   expect(getByText(day, "no spots remaining")).toBeInTheDocument();
  //   cleanup();
  // });


});