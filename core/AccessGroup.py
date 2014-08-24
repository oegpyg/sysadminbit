__author__ = 'og'
from core.models import AccessGroup as AG, AccessGroupModuleRow, AccessGroupRecordRow, AccessGroupReportRow, \
    AccessGroupRoutineRow, AccessGroupCustomRow


class AccessGroup():
    __doc__ = """This method is of get all access for the current user
    param @userAccessGroup Code is defined in the userprofile Ex. = SYS
    """
    #visibility constants
    ALL_RECORDS = 0
    ONLY_OFFICE = 1

    #access contants
    DENIED = 1
    ALLOWED = 2

    def __init__(self, userAccessGroup):
        self.ag = AG.objects.get(Code=userAccessGroup)
        self.ModulesAccess = self.ag.ModuleAccess
        self.RecordsAccess = self.ag.RecordAccess
        self.ReportsAccess = self.ag.ReportAccess
        self.RoutinesAccess = self.ag.RoutineAccess

        self.check_modules()
        self.check_records()
        self.check_reports()
        self.check_routines()

    def check_modules(self):
        if not hasattr(self, "__modules__"):
            self.__modules__ = {}
            agmodules = AccessGroupModuleRow.objects.filter(masterId=self.ag.id)

            for row in agmodules:
                self.__modules__[row.Name] = row.Access

    def check_records(self):
        if not hasattr(self, "__records__"):
            self.__records__ = {}
            self.__records_visibility__ = {}
            agrecords = AccessGroupRecordRow.objects.filter(masterId=self.ag.id)

            for row in agrecords:
                self.__records__[row.Name] = row.Access
                self.__records_visibility__[row.Name] = row.Visibility

    def check_reports(self):
        if not hasattr(self, "__reports__"):
            self.__reports__ = {}
            self.__repords_visibility__ = {}
            agreports = AccessGroupReportRow.objects.filter(masterId=self.ag.id)

            for row in agreports:
                self.__reports__[row.Name] = row.Access
                self.__repords_visibility__[row.Name] = row.Visibility

    def check_routines(self):
        if not hasattr(self, "__routines__"):
            self.__routines__ = {}
            agroutines = AccessGroupRoutineRow.objects.filter(masterId=self.ag.id)

            for row in agroutines:
                self.__routines__[row.Name] = row.Access

    def canOpenRecord(self, recordname):
        return self.__records__.get(recordname, self.DENIED)

    def canOpenReport(self, reportname):
        return self.__reports__.get(reportname, self.DENIED)

    def canOpenRoutine(self, routinename):
        return self.__routines__.get(routinename, self.DENIED)

    def getRecordVisibility(self, recordname):
        __doc__ = """On call record list firts check visibility example salesman need see Invoice but
        he view only records of her office"""
        return self.__records_visibility__.get(recordname, self.ALL_RECORDS)

    def canViewModule(self, modulename):
        return self.__modules__.get(modulename, 1)

    def canDo(self, actionname, default=True):
        __doc__ = """This method is to custom valid access
        Example=
        if not canDo('InvalidateInvoice'):
            return "User is not authorized for this action"
        """
        agcustom = AccessGroupCustomRow.objects.filter(masterId=self.ag.id)
        for row in agcustom:
            if row.Name == actionname:
                if row.Access != self.DENIED:
                    return True
                else:
                    return False
        return default
