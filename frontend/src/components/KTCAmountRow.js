function KTCAmountRow(props) {
  return (
    <tr>
      <td>{props.index}</td>
      <td>{props.walletAddress}</td>
      <td>{props.eth}</td>
      <td>{props.ktc}</td>
    </tr>
  );
}

export default KTCAmountRow;
