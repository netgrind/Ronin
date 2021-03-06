function Commander(element,element_input)
{
  this.element = element;
  this.element_input = element_input;
  this.hint = new Hint();
  this.storage = [];
  this.storage_index = 0;
  this.always_show = false;

  var queue = [];
  
  this.query = function(input_str)
  {
    if(input_str.indexOf(";") > 0){
      queue = input_str.split(";");
    }
    else{
      queue.push(input_str)
    }
    run();
    this.hide();
  }

  function run()
  {
    console.log("~ "+queue[0].trim());
    active(queue[0].trim());

    queue.shift();
    if(queue.length > 0){
      setTimeout(function(){ run(); }, 100);
    }
  }

  function active(content)
  {
    var key = content[0];
    var cmd = new Command(content.substring(1).trim().split(" "));
    
    if(ronin.modules[key]){
      ronin.modules[key].active(cmd);
    }
    
    ronin.history.add(content);
  }
  
  this.passive = function(content)
  {
    var key = content[0];
    var cmd = new Command(content.substring(1).split(" "));
    
    ronin.module = null;
    
    if(ronin.modules[key]){
      ronin.modules[key].passive(cmd);
      ronin.module = ronin.modules[key];
    }
    this.hint.update(ronin.module,cmd);
  }
  
  //
  
  this.show = function()
  {
    this.element.setAttribute('class','visible');
    this.element_input.focus();
    this.element_input.value = "";
  }

  this.always = function() {
    this.always_show = !this.always_show;
  }
  
  this.hide = function()
  {
    if (!this.always_show) {
      this.element.setAttribute('class','hidden');
    }
    this.element_input.value = "";
  }
  
  this.clear = function()
  {
    this.element_input.value = "";
  }
  
  this.next_cmd = function()
  {
    this.storage_index += this.storage_index < this.storage.length ? 1 : 0;
    this.element_input.value = this.storage[this.storage_index] ? this.storage[this.storage_index] : "";
  }
  
  this.prev_cmd = function()
  {
    this.storage_index -= this.storage_index < 1 ? 0 : 1;
    this.element_input.value = this.storage[this.storage_index];
  }
  
}
