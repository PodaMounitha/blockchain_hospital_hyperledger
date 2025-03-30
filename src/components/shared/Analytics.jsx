import React, { useState } from 'react';
import PageHeader from '../PageHeader';
import { 
  ChartBarIcon, 
  ChartPieIcon, 
  CalendarIcon, 
  UsersIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend, 
  ArcElement 
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Analytics({ userType }) {
  const [timeRange, setTimeRange] = useState('month');
  const [chartType, setChartType] = useState('line');
  
  // Mock data for the charts
  const chartData = getChartData(timeRange, userType);
  const statsData = getStatsData(userType);
  
  return (
    <div>
      <PageHeader 
        title="Analytics" 
        description={userType === 'doctor' ? 
          "Track patient metrics and appointments" : 
          "Monitor your health progress and appointments"
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {statsData.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between mb-6">
          <div className="flex space-x-2 mb-4 sm:mb-0">
            <button
              onClick={() => setChartType('line')}
              className={`px-3 py-2 rounded-md flex items-center ${
                chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <ChartBarIcon className="h-5 w-5 mr-1" />
              Line
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`px-3 py-2 rounded-md flex items-center ${
                chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <ChartBarIcon className="h-5 w-5 mr-1" />
              Bar
            </button>
            <button
              onClick={() => setChartType('pie')}
              className={`px-3 py-2 rounded-md flex items-center ${
                chartType === 'pie' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              <ChartPieIcon className="h-5 w-5 mr-1" />
              Pie
            </button>
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => setTimeRange('week')}
              className={`px-3 py-2 rounded-md text-sm ${
                timeRange === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('month')}
              className={`px-3 py-2 rounded-md text-sm ${
                timeRange === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange('year')}
              className={`px-3 py-2 rounded-md text-sm ${
                timeRange === 'year' ? 'bg-blue-500 text-white' : 'bg-gray-700 text-gray-300'
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="h-80">
          {chartType === 'line' && (
            <Line 
              data={chartData.lineData} 
              options={chartData.options} 
            />
          )}
          
          {chartType === 'bar' && (
            <Bar 
              data={chartData.barData} 
              options={chartData.options} 
            />
          )}
          
          {chartType === 'pie' && (
            <div className="flex justify-center h-full">
              <div className="w-72">
                <Pie 
                  data={chartData.pieData} 
                  options={{
                    plugins: {
                      legend: {
                        position: 'right',
                        labels: {
                          color: 'white'
                        }
                      }
                    }
                  }} 
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {userType === 'doctor' && <DoctorMetrics />}
      {userType === 'patient' && <PatientMetrics />}
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-full ${stat.bgColor} mr-4`}>
          <stat.icon className={`h-6 w-6 ${stat.iconColor}`} />
        </div>
        <div>
          <p className="text-sm text-gray-400">{stat.title}</p>
          <div className="flex items-center">
            <p className="text-2xl font-semibold text-white">{stat.value}</p>
            {stat.change !== 0 && (
              <div className={`flex items-center ml-2 ${
                stat.change > 0 ? 'text-green-500' : 'text-red-500'
              }`}>
                {stat.change > 0 ? 
                  <ArrowUpIcon className="h-3 w-3" /> : 
                  <ArrowDownIcon className="h-3 w-3" />
                }
                <span className="text-xs ml-1">{Math.abs(stat.change)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DoctorMetrics() {
  // Mock data for doctor's metrics
  const data = {
    patientsByAge: {
      labels: ['0-18', '19-35', '36-50', '51-65', '65+'],
      datasets: [
        {
          data: [15, 30, 25, 20, 10],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    appointmentTypes: {
      labels: ['Check-up', 'Follow-up', 'Consultation', 'Procedure', 'Emergency'],
      datasets: [
        {
          data: [40, 30, 15, 10, 5],
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Patients by Age Group</h3>
        <div className="h-64">
          <Pie 
            data={data.patientsByAge}
            options={{
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    color: 'white'
                  }
                }
              }
            }}
          />
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-white mb-4">Appointment Types</h3>
        <div className="h-64">
          <Pie 
            data={data.appointmentTypes}
            options={{
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    color: 'white'
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

function PatientMetrics() {
  // Mock data for patient's metrics
  const healthMetrics = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Blood Pressure (systolic)',
        data: [130, 128, 125, 126, 122, 120],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        label: 'Heart Rate',
        data: [85, 82, 80, 78, 76, 75],
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        yAxisID: 'y1',
      },
    ],
  };
  
  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Blood Pressure (mmHg)',
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Heart Rate (bpm)',
          color: 'white'
        },
        grid: {
          drawOnChartArea: false,
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    }
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h3 className="text-lg font-medium text-white mb-4">Health Metrics Over Time</h3>
      <div className="h-80">
        <Line data={healthMetrics} options={options} />
      </div>
    </div>
  );
}

// Helper function to generate chart data based on the selected time range and user type
function getChartData(timeRange, userType) {
  // Labels for the time periods
  let labels = [];
  
  if (timeRange === 'week') {
    labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  } else if (timeRange === 'month') {
    labels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
  } else if (timeRange === 'year') {
    labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  }
  
  // Different data sets for doctors and patients
  let dataSets = [];
  let pieLabels = [];
  let pieData = [];
  
  if (userType === 'doctor') {
    dataSets = [
      {
        label: 'Appointments',
        data: generateRandomData(labels.length, 5, 20),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'New Patients',
        data: generateRandomData(labels.length, 1, 10),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ];
    
    pieLabels = ['Appointments', 'New Patients', 'Follow-ups', 'Procedures', 'Consultations'];
    pieData = [35, 15, 25, 10, 15];
  } else {
    dataSets = [
      {
        label: 'Appointments',
        data: generateRandomData(labels.length, 0, 3),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
      },
      {
        label: 'Health Score',
        data: generateRandomData(labels.length, 70, 95),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      }
    ];
    
    pieLabels = ['Regular Check-ups', 'Specialist Visits', 'Lab Tests', 'Procedures', 'Pharmacy Visits'];
    pieData = [40, 20, 15, 5, 20];
  }
  
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white'
        }
      },
      title: {
        display: true,
        text: userType === 'doctor' ? 'Patient Activity' : 'Health Activity',
        color: 'white'
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        ticks: {
          color: 'white'
        }
      }
    }
  };
  
  return {
    lineData: {
      labels,
      datasets: dataSets
    },
    barData: {
      labels,
      datasets: dataSets
    },
    pieData: {
      labels: pieLabels,
      datasets: [
        {
          data: pieData,
          backgroundColor: [
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 206, 86, 0.6)',
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1,
        },
      ],
    },
    options
  };
}

// Helper function to generate stats data
function getStatsData(userType) {
  if (userType === 'doctor') {
    return [
      {
        title: 'Total Patients',
        value: '248',
        change: 12,
        icon: UsersIcon,
        bgColor: 'bg-blue-500/20',
        iconColor: 'text-blue-500'
      },
      {
        title: 'Appointments This Month',
        value: '86',
        change: 5,
        icon: CalendarIcon,
        bgColor: 'bg-green-500/20',
        iconColor: 'text-green-500'
      },
      {
        title: 'Completion Rate',
        value: '94%',
        change: 2,
        icon: ChartBarIcon,
        bgColor: 'bg-purple-500/20',
        iconColor: 'text-purple-500'
      }
    ];
  } else {
    return [
      {
        title: 'Upcoming Appointments',
        value: '3',
        change: 0,
        icon: CalendarIcon,
        bgColor: 'bg-blue-500/20',
        iconColor: 'text-blue-500'
      },
      {
        title: 'Health Score',
        value: '85%',
        change: 8,
        icon: ChartBarIcon,
        bgColor: 'bg-green-500/20',
        iconColor: 'text-green-500'
      },
      {
        title: 'Medication Adherence',
        value: '92%',
        change: -3,
        icon: ChartPieIcon,
        bgColor: 'bg-purple-500/20',
        iconColor: 'text-purple-500'
      }
    ];
  }
}

// Helper function to generate random data for charts
function generateRandomData(length, min, max) {
  return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
} 