function Stroke(rune)
{
  Module.call(this,rune);
  
  this.parameters = [Any];
  
  // Create a stroke
  
  this.positions = null;
  
  this.new_stroke = function()
  {
    this.positions = [];
  }
  
  this.append_stroke = function(p)
  {
    this.positions.push(p);
  }
  
  this.save_stroke = function(mode)
  {
    s = "_ module="+mode+" ";
    for (i = 0; i < this.positions.length; i++) {
      s += this.positions[i].render()+" ";
    }
    if(this.positions.length > 0){ ronin.history.add(s); }
    this.positions = null;
  }
  
  // Module
  
  this.passive = function(cmd)
  {
  }
  
  this.active = function(cmd)
  {
    var prev = null
    for (i = 1; i < cmd.content.length; i++) {
      var p = new Position(cmd.content[i]);
      if(prev){
        this.draw(prev,p);
      }
      prev = p;
    }
  }
  
  this.draw = function(pos1,pos2)
  {
    ronin.surface.context().beginPath();
    ronin.surface.context().moveTo(pos1.x,pos1.y);
    ronin.surface.context().lineTo(pos2.x,pos2.y);
    ronin.surface.context().lineCap="round";
    ronin.surface.context().lineWidth = 10;
    ronin.surface.context().strokeStyle = ronin.brush.color.rgba();
    ronin.surface.context().stroke();
    ronin.surface.context().closePath();
  }
  
}