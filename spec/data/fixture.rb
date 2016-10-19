module Fixture
  def q1_ok_program
%q{
MOV R3, 0x0003
MOV R5, 0x0004
ADD R3, R5
}
  end

  def sum_r1_r2_program
    'ADD R1, R2'
  end

  def times_two_usage_program
%q{
MOV R1, 0x0002
CALL timesTwo
CALL timesTwo
}
  end

  def times_two_definition_program
%q{
timesTwo:
MUL R1, 0x0002
}
  end

  def syntax_error_program
    'MOB R3, 0x0003'
  end

  def runtime_error_program
    'CALL unknown'
  end
end