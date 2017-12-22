require_relative 'spec_helper'

describe GobstonesExpectationsHook do
  def req(expectations, content)
    OpenStruct.new(expectations: expectations, content: content)
  end

  def compile_and_run(request)
    runner.run!(runner.compile(request))
  end

  let(:runner) { GobstonesExpectationsHook.new(mulang_path: './bin/mulang') }
  let(:result) { compile_and_run(req(expectations, code)) }

  context 'basic expectations' do
    let(:code) { 'program { foo := 1 }' }
    let(:expectations) do
      [{binding: '*', inspection: 'Declares:foo'}]
    end

    it { expect(result).to eq([{expectation: expectations[0], result: true}]) }
  end

  context 'multiple basic expectations' do
    let(:code) { 'program { bar := 1 }' }
    let(:expectations) do
      [{binding: '*', inspection: 'Not:Declares:foo'}, {binding: 'foo', inspection: 'Uses:bar'}]
    end

    it { expect(result).to eq([{expectation: expectations[0], result: true},
                               {expectation: expectations[1], result: false}]) }
  end
end
