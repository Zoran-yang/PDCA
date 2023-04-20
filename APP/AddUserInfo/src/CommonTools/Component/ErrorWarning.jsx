export default function ErrorWarning({ error }) {
  switch (error) {
    case "task type or task name is empty":
      return (
        <p style={{ color: "red", lineHeight: 0, fontSize: 15 }}>
          Check blank row
        </p>
      );
    case "SOP already exist, please revise it directly":
      return (
        <p style={{ color: "red", lineHeight: 0, fontSize: 10 }}>
          SOP already exist, please revise it directly
        </p>
      );
    case "SOP already exist, please revise your SOP infomation":
      return (
        <p style={{ color: "red", lineHeight: 0, fontSize: 10 }}>
          SOP already exist, please revise your SOP infomation
        </p>
      );
  }
}
