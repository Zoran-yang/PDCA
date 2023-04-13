

export default function InputWithWarning(input, notIntialRender) {
  
  if (input.input === null && !notIntialRender) { //This is the first render && input is null
    notIntialRender = true;
    return
  }
  
  return (
    <div style={{marginLeft:10, marginBottom:0}}>
      {!input.input && <p style={{color: 'red', lineHeight:0, fontSize:5}}>Please type a word!</p>}
    </div>
  );
}