function Value(value_str)
{
  Unit.call(this);
  
  this.example = "20";
  this.value = value_str;
  this.float = parseFloat(this.value);
  this.int = parseInt(this.value);
  
  this.render = function()
  {
    return this.value;
  }
}