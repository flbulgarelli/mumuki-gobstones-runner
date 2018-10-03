require 'sinatra/base'
require 'sinatra/cross_origin'

class Mumukit::Server::App < Sinatra::Base
  register Sinatra::CrossOrigin

  configure do
    enable :cross_origin
    set :allow_origin, '*'
  end

  def self.get_asset(route, absolute_path, type)
    get "/assets/#{route}" do
      send_file absolute_path, type: type
    end
  end

  def self.get_board_asset(route, path, type)
    get_asset route, Gobstones::Board.assets_path_for(path), type
  end

  def self.get_editor_asset(route, path, type)
    get_asset route, Gobstones::Blockly.assets_path_for(path), type
  end

  def self.get_submit_asset(route, path, type)
    get_asset route, Gobstones::CodeRunner.assets_path_for(path), type
  end

  def self.get_local_asset(route, path, type)
    get_asset route, File.join(__dir__, '..', path), type
  end

  ['polymer', 'polymer-mini', 'polymer-micro'].each { |name|
    get_board_asset "#{name}.html", "htmls/vendor/#{name}.html", 'text/html'
  }
  get_board_asset 'gs-board.html', 'htmls/gs-board.html', 'text/html'

  get_editor_asset 'editor/gs-element-blockly.html', 'htmls/gs-element-blockly.html', 'text/html'

  get_submit_asset 'editor/gobstones-code-runner.html', 'htmls/gobstones-code-runner.html', 'text/html'

  get_local_asset 'editor/editor.js', 'lib/render/editor/editor.js', 'application/javascript'
  get_local_asset 'editor/editor.css', 'lib/render/editor/editor.css', 'text/css'
  get_local_asset 'editor/editor.html', 'lib/render/editor/editor.html', 'text/html'
  get_local_asset 'boom.png', 'lib/public/boom.png', 'image/png'
  ['red', 'blue', 'green', 'black', 'attires_enabled', 'attires_disabled'].each { |name|
    get_local_asset "editor/#{name}.svg", "lib/public/#{name}.svg", 'image/svg+xml'
  }
end
