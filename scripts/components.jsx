var Cell = React.createClass({
  handleHover: function(){
    this.props.onMouseEnter(this.props.x, this.props.y);
  },
  render: function() {
    var x = this.props.x;
    var y = this.props.y;
    return <td className="tableCell" onMouseEnter={this.handleHover}></td>;
  }
});

var BoardRow = React.createClass({
  handleHover: function(x,y){
    this.props.onMouseEnter(x,y);
  },
  render: function(){
    return(
    <tr>
      <Cell  x={0} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={1} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={2} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={3} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={4} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={5} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={6} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={7} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={8} y = {this.props.y} onMouseEnter={this.handleHover}/>
      <Cell  x={9} y = {this.props.y} onMouseEnter={this.handleHover}/>
    </tr>
    )
  }
})

var Board = React.createClass({
  test: function(x,y){
    console.log(x + ',' + y)
  },
  render: function(){
    var boardX = this.props.boardX;
    var boardY = this.props.boardY;

    return (
      <table className="gameBoard">
        <BoardRow key={'tarp'}   y={0} onMouseEnter={this.test}/>
        <BoardRow key={'tarp2'}  y={1} onMouseEnter={this.test}/>
        <BoardRow key={'tarp3'}  y={2} onMouseEnter={this.test}/>
        <BoardRow key={'tarp4'}  y={3} onMouseEnter={this.test}/>
        <BoardRow key={'tarp5'}  y={4} onMouseEnter={this.test}/>
        <BoardRow key={'tarp6'}  y={5} onMouseEnter={this.test}/>
        <BoardRow key={'tarp7'}  y={6} onMouseEnter={this.test}/>
        <BoardRow key={'tarp8'}  y={7} onMouseEnter={this.test}/>
        <BoardRow key={'tarp9'}  y={8} onMouseEnter={this.test}/>
        <BoardRow key={'tarp9'}  y={9} onMouseEnter={this.test}/>
      </table>
    )
  }
});

React.render(<Board
              boardX={[0,1,2,3,4,5,6,7,8,9]}
              boardY={[0,1,2,3,4,5,6,7,8,9]}/>, document.getElementById('hello'));

